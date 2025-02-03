## 简单移动你的相机

这个操作在glframework也是很简单的，你只需要在之前的代码的基础上加上这几行

```java
CameraManager cameraManager = glEngine.cameraManager;
WindowManager windowManager = glEngine.windowManager;
cameraManager.camera.addControl(new CameraControl(cameraManager, windowManager));
```

>你可能会问，为什么要传入windowManager?如果你传入cameraManager我还能理解，但是windowManager是什么鬼？这是因为，CamaraControl需要获取窗口的事件，但是到底要获取哪个窗口的事件呢？考虑到多窗口，我们不得不声明我们到底要的是哪个窗口。这就是为什么要windowManager的原因。

camera继承了Controllable类，因此，他可以可以添加控制器（control），控制器会在对象被更新时被更新。这就是cameraControl控制相机的原理了。

然后，你可以按W键前进，S键后退，A键左移，D键盘右移，H键抬头，N键低头，B键左偏头，M键右偏头。

## 自定义移动你的相机

因为作者懒，所以glframework自带的相机控制器是只接受键盘事件的，这显然是不合理的。谁控制相机转头用键盘啊？好吧作者用。因为目前作者处于开发阶段，他认为先实现重要的功能再说，所以，这个用鼠标的控制器可能会被鸽掉哦。

所以怎么办呢？读者这么nb了，都知道我这个默默无闻的库了，说明您一定是编程大蛇了，你应该自己实现相机控制器了。

您应该实现Controll抽象类，然后覆盖update方法，写上您自己的逻辑。实际上CameraControl就是这么干的，以下是他update方法的源码。

```java
@Override
public void update() {
    super.update();
    // rotate left
    if (isKeyPressed(window_handle, GLFW_KEY_B)){
        cameraManager.execute(() -> camera.rotate(0.05f, new Vector3f(0, 1, 0)));
    }
    // rotate right
    if (isKeyPressed(window_handle, GLFW_KEY_M)){
        cameraManager.execute(() -> camera.rotate(-0.05f, new Vector3f(0, 1, 0)));
    }
    // rotate up
    if (isKeyPressed(window_handle, GLFW_KEY_H)){
        cameraManager.execute(() -> camera.rotate(-0.05f, camera.left));
    }
    // rotate down
    if (isKeyPressed(window_handle, GLFW_KEY_N)){
        cameraManager.execute(() -> camera.rotate(0.05f, camera.left));
    }
    // move fwd
    if (isKeyPressed(window_handle, GLFW_KEY_W)){
        cameraManager.execute(() -> camera.move(camera.direction.mul(1*moveSpeed)));
    }
    // move back
    if (isKeyPressed(window_handle, GLFW_KEY_S)){
        cameraManager.execute(() -> camera.move(camera.direction.mul(-1*moveSpeed)));
    }
    // move left
    if (isKeyPressed(window_handle,GLFW_KEY_A)){
        cameraManager.execute(() -> camera.move(camera.left.mul(1*moveSpeed)));
    }
    // move right
    if (isKeyPressed(window_handle, GLFW_KEY_D)){
        cameraManager.execute(() -> camera.move(camera.left.mul(-1*moveSpeed)));
    }
    // move up
    if (isKeyPressed(window_handle, GLFW_KEY_SPACE)){
        cameraManager.execute(() -> camera.move(new Vector3f(0, 1*moveSpeed, 0)));
    }
    // move down
    if (isKeyPressed(window_handle, GLFW_KEY_LEFT_CONTROL)){
        cameraManager.execute(() -> camera.move(new Vector3f(0, -1*moveSpeed, 0)));
    }
}
```

::: warning
请一定要写上super.update();这行，不然不保证有正确的结果。
:::

您看，也不是很难不。只是要注意多线程环境下的线程安全问题，您应该确保一个对象的修改是原子化的。使用execute方法是一定能保证操作原子化的，尽管他不是最优解，但他一定不会出bug。您应该自己决定是否使用execute。