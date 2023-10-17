# 橙啦（非官方）Linux 客户端

![橘子图](https://www.pngrepo.com/png/83342/180/orange.png)

一个基于 Electron 编写的[橙啦](https://www.orangevip.com/)非官方 PC 客户端，为 Linux 用户专门打造

## ⚠️ 声明

- 该客户端与[橙啦](https://www.orangevip.com/)平台官方**无任何关联**，您不应在使用本客户端的同时向官方渠道反馈任何技术问题。请直接在本项目 Issue 或 Discussion 讨论；
- 该客户端仅为方便个人在 Linux 平台学习用途开发。无盈利，无打赏 / 捐助，非商业用途，且完全开放源代码；
- 开发者不对非 Linux 平台提供任何支持；
- 开发者**仅考虑支持橙啦 Windows 端所包含的功能**。非官方支持的功能性更新 / 建议可能会被忽略；
- 使用该客户端，即表示您**知情**并**同意**自行承担使用本非官方客户端所造成的**一切（可能）直接或间接损失**，且作者对此**不承担任何责任**。

## ✅ 支持功能

- 课程回放；
- 直播；
- 课程资料下载（非官方 JSBridge 实现）；
- GPU 加速（非官方支持）；
- 以及其它橙啦 Windows 平台支持的一些其它功能（未测试）...

## 🚧 已知问题

暂无

## ⬇️ 下载

> [!IMPORTANT]  
> 只有 NixOS 与 Arch Linux 的构建会进行活跃测试，其余构建均只保证理论上可用。如遇异常，请携带详尽日志和系统环境信息到 issue 区提交问题

### ![NixOS](https://raw.githubusercontent.com/unixporn/distro-icons/master/SVG/nixos.svg) NixOS

该软件已经打包到我的 [NUR](https://github.com/pokon548/nur-packages) 源内。只需要从源里拉取预编译版本即可

### ![Arch Linux](https://raw.githubusercontent.com/unixporn/distro-icons/master/SVG/arch.svg) Arch Linux

已被打包到 [AUR](https://aur.archlinux.org/packages/chengla-linux-unofficial-bin)，可以直接使用。感谢 [@zxp19821005](https://github.com/zxp19821005) 的帮助！

### ![Debian](https://raw.githubusercontent.com/unixporn/distro-icons/master/SVG/debian.svg) Debian / ![Ubuntu](https://raw.githubusercontent.com/unixporn/distro-icons/master/SVG/ubuntu.svg) Ubuntu / 其它 deb 系发行版

请前往 [Releases](https://github.com/pokon548/chengla-for-linux/releases) 下载 deb 包。

### ![Fedora](https://raw.githubusercontent.com/unixporn/distro-icons/master/SVG/fedora.svg) Fedora / ![Fedora](https://raw.githubusercontent.com/unixporn/distro-icons/master/SVG/opensuse.svg) openSUSE / 其它 rpm 系发行版

请前往 [Releases](https://github.com/pokon548/chengla-for-linux/releases) 下载 rpm 包。

### ![Linux](https://raw.githubusercontent.com/unixporn/distro-icons/master/SVG/linux.svg) 其它 Linux 发行版

请前往 [Releases](https://github.com/pokon548/chengla-for-linux/releases) 下载编译好的通用版本。目前上传了以下版本：

- AppImage
- Snap
- linux-unpacked

## 🛠️ 如何编译

推荐使用以下编译套装：

- [VSCode](https://code.visualstudio.com/) + [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) + [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

### 安装依赖

在克隆完本项目的源代码后，执行以下命令安装依赖：

```bash
$ pnpm install
```

### 运行开发版本

```bash
$ pnpm dev
```

### 构建

```bash
$ pnpm build
```
