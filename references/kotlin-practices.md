# Nick Java/Kotlin 实践约束

## 适用与优先级

遵循 [入口规则优先级](../SKILL.md#rule-priority-and-strength)。本文是日常实现规范：风格选择默认为偏好，模式按条件采用。遵守项目语言与工具链，不为局部风格强制升级。历史来源和证据限制仅在追溯时读取 [历史画像](nick-practice-profile.md)；Java 语法与版本选择读取 [Java 规范](java-style.md)。

## 命名与对象

采用业务名词和动词。Command 表示用例输入，Criteria 表示查询条件，Result 表示用例输出，Adapter 表示外部语义边界；不要求简单 CRUD 为每一层创建镜像 DTO。find...OrNull 明确可能缺失，get/require 的缺失语义需由项目统一。布尔查询用 is/has/can，校验函数以 require 加完整业务规则命名，或沿用仓库既有命名。业务校验必须执行：使用 require/check 或具名业务异常，不能依赖可能被关闭的语言内建 assert。

默认 val、不可变集合契约和构造器注入；data class 用于值与传输数据，不机械用于有身份和生命周期的实体。Java 对应 final、适用时的 record 和构造器注入，不模拟 Kotlin 扩展语法。

采用小而纯的 toDomain/toResult 转换。将外部 Command 到领域类型的转换放在应用或边界层，领域层不导入应用输入或 REST 类型。输入字符串、枚举、时间、分页和标识在边界验证；不要把 valueOf 抛出的技术异常直接当业务契约。

## Kotlin 表达习惯

采用短表达式函数和可读的集合变换。单个缺失分支可用 `?: return` 或 `?: throw`；复杂规则显式 if/when，多层 let/also 链应拆成具名中间值。不要用 takeUnless 包装复杂副作用。

```kotlin
// 示例：边界建立合法分页，集合仅用于已界定的小结果集。
data class PageRequest(val page: Int, val size: Int) {
    init {
        require(page >= 1)
        require(size in 1..100)
    }
}

fun List<CatalogEntry>.visibleCodes(): List<String> =
    filter { it.isVisible }.map { it.code }.distinct()
```

不在业务路径使用无依据的 !! 或未检查强转。大量数据在数据库过滤、排序、分页；映射数据库计数时显式处理驱动的 Number 类型和范围。Sequence 只在避免中间集合有实际价值时采用。

## 设计模式：按变化点选择

按真实变化点选择，通用取舍见 [implementation-thinking.md](implementation-thinking.md)。没有明确压力时不引入模式。

| 模式 | 采用条件 | 避免 |
| --- | --- | --- |
| Strategy | 同一业务动作存在独立变化的多种规则 | 为稳定分支提前创建策略家族 |
| Template Method | 算法骨架稳定、步骤变化受控 | 多层继承或扩大 protected API 只为复用几行代码 |
| Adapter | 外部协议需转换成领域语言 | 仅改名转发，泄漏外部 DTO 和异常 |
| Repository + Query | 读写模型或复杂度确有差异 | 强行引入完整 CQRS 或事件溯源 |
| Mapper / Assembler | 边界与领域类型契约不同 | 反向层依赖、无语义差异的重复映射 |
| Cache-aside | 读取成本与陈旧容忍度明确 | 缺少失效语义，混同空结果与失败 |

### Strategy：明确匹配契约

`first { supports(...) }` 容易在零匹配时抛技术异常，在多匹配时静默依赖顺序。以下是脱敏后的目标示意，类型与异常需由项目定义：

```kotlin
interface BenefitPolicy {
    fun supports(kind: BenefitKind): Boolean
    suspend fun grant(request: GrantRequest)
}

class BenefitPolicies(private val policies: List<BenefitPolicy>) {
    fun requirePolicy(kind: BenefitKind): BenefitPolicy {
        val matches = policies.filter { it.supports(kind) }
        require(matches.size == 1) { "Expected exactly one benefit policy" }
        return matches.single()
    }
}
```

策略集合静态时可在启动阶段验证支持类型唯一且完整；动态集合在选择时验证。Java 可用接口与 List/Map 注册表表达相同职责。测试零匹配、多匹配及各策略行为，不只测试正常选择。

### Template Method：保留骨架，限制继承

```kotlin
// 脱敏结构示意；不是事务或幂等性的完整实现。
abstract class EnrollmentPolicy {
    suspend fun enroll(request: EnrollmentRequest) {
        requireEligible(request)
        performEnrollment(request)
        recordEnrollment(request)
    }

    protected abstract suspend fun requireEligible(request: EnrollmentRequest)
    protected abstract suspend fun performEnrollment(request: EnrollmentRequest)
    protected abstract suspend fun recordEnrollment(request: EnrollmentRequest)
}
```

只有顺序是真正的不变量时采用模板。若步骤需独立组合，改用组合和明确的协作者。外部动作成功后本地记录失败会造成重试重复，必须按业务定义事务边界、幂等键和恢复行为；模板方法本身不解决分布式一致性。

### Adapter 与 Query 的职责

外部 Adapter 暴露领域语义的操作和错误，基础设施实现处理协议、认证、超时、映射。Query 可以返回专用投影，Repository 表达持久化契约；不要为读写分离强行引入消息系统或最终一致性。

## 错误、异步与副作用

采用具名业务异常和提前校验；空集合只表示没有元素，不掩盖网络或数据库失败。辅助通知允许降级须有用例契约，记录可定位的失败信息并传入异常对象。禁止无区别吞掉异常；协程 CancellationException 必须继续传播。

非阻塞客户端使用 suspend/Flow；阻塞驱动在基础设施边界切换调度器并管理资源生命周期。Java 使用项目支持的阻塞/异步模型，不机械转写协程。跨系统重试明确上限、幂等与失败结果。

## 测试与评审

测试方法统一遵循 [testing.md](testing.md)。以下仅补充本类代码的场景选择：配置选择覆盖匹配、不匹配、空输入、多配置优先级与边界时间；存储查询覆盖 NULL、聚合类型、联表重复与分页稳定性。模式代码同时测失败选择与幂等语义。

```kotlin
// 脱敏目标示意；真实策略和固定输入，不 Mock 内部领域服务。
@Test
fun `uses fallback when experiment is absent`() {
    val selector = OfferSelector()
    val fallback = offer(experiment = null)
    val experimental = offer(experiment = "sample-variant")

    val selected = selector.select(listOf(experimental, fallback), experiment = null)

    assertEquals(fallback.id, selected?.id)
}
```

评审关注：名称是否是同一套业务词汇；规则是否归正确对象；模式是否对应真实变化点；空值、失败和取消是否明确；SQL/外部副作用是否有边界验证；测试是否断言行为且可确定重放。不要为形式统一增加层、接口或继承。
