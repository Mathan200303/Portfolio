# Admin Panel Guide

## Access Admin Panel

1. Navigate to: `http://localhost:3000/admin/login`
2. Default credentials:
   - Username: `admin`
   - Password: `admin123`

## Features

### Dashboard
- Central hub to access all editing sections
- Quick navigation to all portfolio sections

### Edit Sections

1. **Hero Section** (`/admin/hero`)
   - Edit greeting text
   - Change name
   - Update title/profession
   - Manage social media links

2. **About Section** (`/admin/about`)
   - Edit section title
   - Add/remove/edit paragraphs
   - Update about content

3. **Skills** (`/admin/skills`)
   - Add/remove skills
   - Edit skill names
   - Update icons and colors

4. **Education** (`/admin/education`)
   - Add/remove education entries
   - Edit period, degree, institution

5. **Projects** (`/admin/projects`)
   - Add/remove projects
   - Edit project details
   - Manage tools/technologies
   - Update descriptions

6. **Contact** (`/admin/contact`)
   - Update email, phone, location
   - Manage social media links

## Data Storage

Currently using **localStorage** for data persistence. All changes are saved automatically when you click "Save Changes".

## Security Note

⚠️ **Important**: Change the default admin credentials in production!

Edit `app/admin/login/page.tsx` and update:
```typescript
const ADMIN_USERNAME = 'your-username'
const ADMIN_PASSWORD = 'your-secure-password'
```

## Future Enhancements

- Database integration (MongoDB/PostgreSQL)
- Image upload functionality
- Rich text editor for descriptions
- Preview mode before publishing
- Version history/backup
