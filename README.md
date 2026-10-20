# starkforgex.in

Static website for StarkForgeX Technologies: the college welcome page, the course catalog and the demo LMS.
No build step and no dependencies: plain HTML, CSS and JavaScript.

## Structure

```
starkforgex-in/
├── index.html              Welcome page (starkforgex.in)
├── courses/index.html      Course catalog (starkforgex.in/courses)
├── demo/index.html         Demo LMS with sample data (starkforgex.in/demo)
├── 404.html                Page-not-found page
├── assets/
│   ├── css/                base.css + one stylesheet per page
│   ├── js/                 courses.js (course data), demo.js (demo LMS)
│   └── images/             logos, favicon, social preview image
├── favicon.ico
├── robots.txt
├── sitemap.xml
└── vercel.json             Clean URLs and security headers
```

## Editing content

- **Course details** (syllabus, hours, projects, FAQ): edit the `C` array at the top of `assets/js/courses.js`.
- **Demo LMS sample data**: edit `assets/js/demo.js`.
- **Logo**: replace the files in `assets/images/` keeping the same names.

## Preview locally

Open `index.html` in a browser. All links are relative, so the pages work straight from the folder.

## Deploy on Vercel

1. Put this folder in a GitHub repository (on github.com: New repository, then "uploading an existing file" and drag in the folder contents).
2. On vercel.com: Add New > Project > Import the repository.
3. Framework preset: **Other**. Leave Build Command and Output Directory empty. Click Deploy.
4. Project > Settings > Domains: add `starkforgex.in` and `www.starkforgex.in`.
5. At your domain registrar, add the DNS records Vercel shows (typically an A record for `@` and a CNAME for `www`).

Every push to the repository redeploys the site automatically.
