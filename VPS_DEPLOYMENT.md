# Steel Motion Blog - VPS Deployment Guide

## 🎯 Current Status

✅ **Completed**:
- Blog implementation with Sanity CMS
- Local development and testing
- Code committed and pushed to GitHub
- All blog components and pages created
- Environment variables configured locally

## 🚀 VPS Deployment Steps

### Step 1: Connect to Your VPS

```bash
ssh -i ~/.ssh/steel_motion_vps root@72.60.115.247
```

### Step 2: Navigate to Project Directory

```bash
cd steel-motion
```

### Step 3: Pull Latest Code from GitHub

```bash
git pull origin main
```

### Step 4: Set Up Environment Variables

Create or update the `.env.local` file on the VPS:

```bash
nano .env.local
```

Add the following content (replace with your actual values):

```bash
# Resend API Key for email functionality
RESEND_API_KEY=your_resend_api_key_here

# Sanity Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_sanity_api_token_here
```

### Step 5: Install New Dependencies

```bash
npm install
```

This will install the new Sanity dependencies:
- @sanity/client
- @sanity/image-url
- @portabletext/react
- next-sanity
- sanity
- groq
- styled-components

### Step 6: Build the Application

```bash
npm run build
```

**Note**: If the build fails with Turbopack, the package.json has been updated to use the standard Next.js compiler which works with Sanity.

### Step 7: Restart PM2 Process

```bash
pm2 restart steel-motion-app
```

Or if PM2 isn't running:

```bash
pm2 start npm --name "steel-motion-app" -- start
```

### Step 8: Check PM2 Status

```bash
pm2 status
pm2 logs steel-motion-app
```

## 🔧 Troubleshooting

### If Build Fails

1. **Clear Next.js cache**:
   ```bash
   rm -rf .next
   npm run build
   ```

2. **Check Node.js version**:
   ```bash
   node --version
   # Should be 18 or higher
   ```

3. **Install dependencies again**:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   npm run build
   ```

### If Blog Pages Don't Load

1. **Check environment variables**:
   ```bash
   cat .env.local
   ```

2. **Verify Sanity connection**:
   - Test the Studio at: `https://steelmotionllc.com/studio`
   - Check if the project ID and token are correct

3. **Check application logs**:
   ```bash
   pm2 logs steel-motion-app
   ```

## 🌐 Blog Access Points

Once deployed, the blog will be available at:

- **Blog Homepage**: `https://steelmotionllc.com/blog`
- **Sanity Studio**: `https://steelmotionllc.com/studio`
- **Individual Posts**: `https://steelmotionllc.com/blog/[post-slug]`
- **Categories**: `https://steelmotionllc.com/blog/category/[category-slug]`

## 📝 Next Steps After Deployment

### 1. Set Up Content in Sanity Studio

1. **Access Studio**: Go to `https://steelmotionllc.com/studio`
2. **Create Author Profiles**:
   - Add team members with veteran backgrounds
   - Include military branch, rank, years of service
   - Add profile photos and bio information

3. **Create Categories**:
   - AI & Automation (Cyan)
   - Cybersecurity (Red)
   - Cloud Infrastructure (Blue)
   - Custom Development (Purple)
   - Data Analytics (Green)
   - Industry Insights (Orange)
   - Case Studies (Indigo)

4. **Write First Blog Posts**:
   - Create 3-5 initial posts to launch with content
   - Focus on veteran perspectives in technology
   - Include technical insights and business value

### 2. Configure Sanity CORS

In your Sanity project dashboard:
1. Go to API settings
2. Add your domain: `https://steelmotionllc.com`
3. Enable credentials for the domain

### 3. Test All Functionality

- [ ] Blog homepage loads correctly
- [ ] Navigation links work (Blog in navbar)
- [ ] Sanity Studio is accessible
- [ ] Can create and publish content
- [ ] Individual blog posts render properly
- [ ] Category pages work
- [ ] Mobile responsiveness
- [ ] SEO metadata is correct

## 🔒 Security Checklist

- [ ] Environment variables are not committed to Git
- [ ] Sanity API token has appropriate permissions (Editor)
- [ ] CORS is configured correctly in Sanity
- [ ] HTTPS is working on all blog pages
- [ ] No sensitive information in blog content

## 📊 Performance Monitoring

After deployment, monitor:
- Page load times for blog pages
- Sanity API response times
- Build times for content updates
- Server memory and CPU usage

## 🆘 Emergency Rollback

If the blog causes issues:

```bash
# Revert to previous commit
git log --oneline -5
git reset --hard [previous-commit-hash]
npm install
npm run build
pm2 restart steel-motion-app
```

## 📞 Support

- **Sanity Documentation**: https://sanity.io/docs
- **Next.js Documentation**: https://nextjs.org/docs
- **Blog Setup Guide**: See `BLOG_SETUP.md` in the project root

---

## 🎖️ Steel Motion Blog Features

**What You're Getting**:
- Professional blog with veteran-focused content management
- SEO-optimized pages for better search visibility
- Mobile-responsive design matching your brand
- Rich content editing with code blocks, images, and callouts
- Author profiles highlighting military backgrounds
- Category-based organization for easy content discovery
- Newsletter integration for lead generation

**Content Strategy Ready**:
- Technical deep dives demonstrating expertise
- Case studies showing real-world results
- Industry insights with veteran perspectives
- How-to guides for practical value
- Leadership lessons from military service

**Ready to Deploy! 🚀**

Follow the steps above to get your Steel Motion blog live on your production VPS.