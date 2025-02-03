## 创建一个三角形

创建三角形在glframework是一件在简单不过的事情了。

你只需要如下的代码

>为了节省空间，就不写import语句了。类反正是在com.euuen包中，重名了，就选在com.euuen包中的。如果在com.euuen包中还重名，那么作者会提示你具体是在哪个包里面的。

```java
public static void main(String[] args) {
    GLEngineSettings settings = new GLEngineSettings();
    settings.update_rate = 60;
    settings.window_width = 640;
    settings.window_height = 480;
    settings.window_title = "glframework";
    GLEngine glEngine = new GLEngine(settings);
    glEngine.startAsync();
    glEngine.waitForInit();
    SceneManager sceneManager = glEngine.sceneManager;
    sceneManager.execute(() -> {
        sceneManager.addModel(new Triangle());
    });
}
```

下面详细讲解一下这段代码

GLEngine是glframework的核心类，他负责掌管了很多“基础设施”，如窗口管理器WindowManager,场景管理器SceneManager,等等之类的管理器。

他的启动需要GLEngineSettings，他有很多的属性。

+ update_rate，指的是刷新率。
+ window_width，指的是窗口宽度。
+ window_height，指的是窗口高度。
+ window_title，指的是窗口标题。

你可以自由修改他们。然后把settings传入GLEngin，构建GLEngine。GLEngine会根据你的参数构建相应的管理器。

构建完了GLEngine后，你就应该启动他了。我推荐你用***startAsync()***， 本文中使用的启动方法。他的底层原理就是把窗口绘制与缓冲区更新循环放到了子线程中，从而避免主线程被阻塞。

>当然你可以让窗口绘制与缓冲区更新循环放在主线程运行，就是用start()方法。不过这样，你就应该搭配after()方法使用了。不过我还是推荐你用startAsync方法，因为他是把这些重型循环都放在了另一个线程中，你可以在主循环做些其他的IO耗时的事情，从而避免让你的程序卡顿。

::: details 使用start与after方法的等价代码
```java
public static void main(String[] args) {
    GLEngineSettings settings = new GLEngineSettings();
    settings.update_rate = 60;
    settings.window_width = 640;
    settings.window_height = 480;
    settings.window_title = "glframework";
    GLEngine glEngine = new GLEngine(settings);
    glEngine.start();
    SceneManager sceneManager = glEngine.sceneManager;
    sceneManager.addModel(new Triangle());
}
```
:::

启动之后，你就得等GLEngine初始化完成，要不然很多基础组件你是用不了的，比如***WindowManager***。所以我们才需要调用waitForInit()方法。他会阻塞线程知道GLEngine初始化完成。

之后你就可以直接访问SceneManager添加三角形啦。

>为什么要这样套个Runnable添加三角形？因为作者脑子有坑。好吧，不扯淡了。其实是因为这里存在线程安全问题，就是可能OpenGL在读取模型时，你就突然添加模型，导致模型列表不完整，然后java就崩溃了。所以我是这么解决这个问题的，我先把他的修改操作保存起来，等到一个时机统一执行，这样就不会出现线程安全问题了。

你看总共才几行的操作，你就完成了你用原版OpenGL要用40多行的事情，glframework你值得拥有。(^_^)