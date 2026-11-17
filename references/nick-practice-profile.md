# Nick 历史代码实践画像

## 使用边界

这是一份基于本人 Git 提交差异的历史画像，不是人格判断或所有代码的穷举。抽查覆盖活动、内容、评论、消息、购物及门户接口，代表样本来自 2020—2021 年。团队框架约定可能影响个人写法。Java 规则是从 Kotlin 实践转译，尚无足够 Java 样本证明个人偏好。

历史行为用于解释设计倾向，不自动升级为强制规范。现有 testing.md 的 TDD、真实领域对象优先和边界替身规则继续生效；历史内部服务 Mock 不覆盖这些要求。

本文及配套文档中的代码均为脱敏改写示意，非生产原文，未作为完整应用编译。替换了公司、包名、业务名称、配置键和标识；不携带内部域名、个人邮箱、客户数据或真实配置值。证据用 E 编号定位，不在对外文档中携带私有仓库路径或提交链接。

## 实践画像

| 维度 | 观察到的倾向 | 应固化的实践 | 限制与反例 |
| --- | --- | --- | --- |
| 命名 | 长而具体的业务动作、查询条件及规则名称；Command / Result / Query 区分角色 | 让名称表达业务动作与结果契约 | 英文语法、拼写偶有偏差；不复制原有错误 |
| 方法组织 | 应用服务编排，多条 assert 校验拆成私有方法 | 主流程可顺序阅读，规则单独命名 | 不为每行代码提取方法 |
| 模块设计 | 按业务组织 application、domain、query、repository、adapter | 按变化原因划分职责 | 并非所有样本都遵守严格依赖方向 |
| 数据建模 | data class、val、枚举、VO；边界输入转领域条件 | 让业务状态明确，保持不可变默认 | 部分业务元数据仍用字符串 Map，不能据此推崇弱类型 |
| 转换 | toResult / toCriteria 等扩展函数 | 小而纯的转换紧邻拥有其依赖的层 | 历史领域文件引用应用 Command 的反向依赖需要纠正 |
| 集合 | filter / map / distinctBy / firstOrNull，局部使用 Sequence | 管道表达筛选和投影 | 不能把内存分页推广为大数据查询方案 |
| 空值 | 可空返回、Elvis、let、takeIf / takeUnless | 明确缺失语义，提前结束失败路径 | 也存在 !!、强转和直接 valueOf；需要加强边界验证 |
| 异步 | suspend / Flow / R2DBC，阻塞访问切换 IO 调度器 | 区分非阻塞和阻塞边界 | suspend 本身不保证非阻塞 |
| SQL | 手写参数绑定 SQL，数据库端联表、聚合 | 显式查询契约，聚合归数据库 | 类型映射、重复行、NULL 和计数需要集成验证 |
| 集成 | Adapter 隔离外部系统，缓存包装读取 | 隔离外部协议与失效策略 | 无证据说明统一采用某个架构或缓存策略 |
| 错误 | 具名业务异常，辅助通知失败局部降级 | 主业务失败与辅助副作用失败分开定义 | 宽泛 catch、日志拼接不应复制；协程取消不能吞掉 |
| 测试 | JUnit 5、Mockito Kotlin、Hamcrest、协程测试；should/when 名称；工厂准备数据 | 行为场景驱动，断言返回结果 | 服务间测试投入不均，无法证明始终 TDD |
| 迭代 | 小步修复，持续重命名、拆职责、格式调整 | 小而完整的行为增量 | 历史 TODO 中间提交不能视为可交付标准 |

## 脱敏历史模式：规则可读性

E1 的组织方式可以抽象为：

```kotlin
suspend fun activate(id: String, command: ActivateCommand) {
    val enrollment = findById(id) ?: throw EnrollmentNotFound(id)
    assertWindowIsOpen(enrollment)
    assertApplicantIsEligible(enrollment)
    assertApplicantIsNotOwner(enrollment, command.applicantId)
    entries.save(enrollment.activate(command.applicantId))
}
```

保留顺序清晰的规则编排。规则依赖实体自身状态时优先归实体；跨边界查询由应用服务或领域服务协调。不要将所有规则都塞进应用服务。

## 测试历史与当前要求

E4 新增服务单测，用 Mock 隔离内部服务，以多组实验配置验证选择结果；E5 补充缺少实验标识的回退场景。这证明场景意识，不能证明测试先于实现。E6 将配置对象从 Mock 改为真实实例，说明简单值对象未必适合 Mock。

当前规范采用真实领域对象和固定时间；只有外部边界使用替身。保留历史行为测试的可读性，避免照搬内部服务 Mock、随机 UUID、实时系统时钟、重复场景以及名称和实际数据不一致。

## 证据索引与复核

E1：本人将读取从持久化职责拆出，并在应用服务命名业务校验。
E2：本人新增搜索 Command、强类型 Criteria、Payload 和转换函数；同一差异含 TODO 与反向层依赖。
E3：本人调整阻塞存储访问，将删除操作置于 IO 调度器。
E4：本人新增配置选择的应用服务与 JUnit/Mockito 协程测试。
E5：本人补充空实验标识的回退测试。
E6：本人修复单测，将配置 Mock 改为真实配置对象。
E7：本人修改策略选择调用，并修改具体规则处理器；框架基类的原创归属不作推断。
E8：本人将辅助推送错误局部捕获；该差异同时改动持久化条件，不能把整段修改认定为正确示范。

原始仓库、提交 ID、作者信息留在审阅工作区，通过 Git 复核，不随 skill 分发。未确认的模式不写成个人偏好：当前没有足够证据支持偏爱 Builder、Observer、Decorator、Saga 或 Event Sourcing。文件名含 Factory 也不足以证明工厂模式。
