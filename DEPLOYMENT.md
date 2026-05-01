# 部署与承载访问量说明

## 推荐方式

这个项目是纯前端测验，没有数据库、登录和服务端计算。推荐使用 Next.js 静态导出后部署到 CDN 型平台，例如 Netlify、Vercel 或 Cloudflare Pages。

当前配置已经启用：

- `output: "export"`：构建后生成 `out` 静态文件夹。
- `trailingSlash: true`：让静态托管路径更稳定。
- 长缓存 `_next/static/*`：构建后的 JS/CSS 静态资源可被 CDN 长期缓存。
- 页面短缓存：HTML 保持可更新，发布新版本后不会长期卡旧页面。

## 为什么能承受较多访问

用户访问时拿到的是 HTML、CSS、JS 静态文件，测验计算在浏览器里完成。流量压力由 CDN 平台分发，不需要你的电脑在线，也不会由单台服务器执行后端逻辑。

在内容不接后端、不上传图片、不写数据库的前提下，这种部署方式通常比自建服务器更适合突然的分享传播。

## Netlify 部署

如果使用拖拽部署：

1. 双击 `build-share-folder.cmd`。
2. 构建完成后上传 `out` 文件夹。
3. 确认站点没有开启 Password protection。

如果使用 Netlify 项目连接仓库：

- Build command: `npm run build`
- Publish directory: `out`
- Node version: `24.14.0`

项目里的 `netlify.toml` 已经写入这些配置。

## 高访问量注意事项

- 不要把这个网站部署在自己的电脑上分享，必须用 CDN 托管平台。
- 不要在前端加入需要隐藏的密钥。
- 如果后续加入埋点、表单提交、图片生成或数据库，访问量瓶颈会转移到对应服务，需要单独设计限流和队列。
- 如果预计有大规模传播，优先选择 Cloudflare Pages、Vercel 或 Netlify 的正式项目部署，而不是临时预览链接。
