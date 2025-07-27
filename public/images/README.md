# Portfolio Images Directory

Highly optimized image management system serving directly from the public folder.

## Directory Structure

```
public/images/
├── projects/           # Project showcase images
├── avatars/           # Profile avatars
├── badges/            # Certification badge images
└── logo/              # Brand logo files
```

## Required Images

### Project Images (`public/images/projects/`)

| Project Title | Required Filename |
|---------------|-------------------|
| Full Beauty FBB | `fullbeauty.jpg` |
| Aquasana | `aquasana.jpeg` |
| AOSmith | `aosmith.jpg` |
| LaneBryant | `lanebryant.jpg` |
| Loreal | `loreal.webp` |
| Camping World | `campingworld.webp` |
| Saje | `saje.jpg` |
| Hotwater | `hotwater.jpg` |
| State | `state.webp` |
| Reliance | `reliance.jpg` |
| American | `american.png` |
| Lochinvar | `lochinvar.jpeg` |
| LondonDrugs | `londondrugs.jpg` |
| Uniqlo | `uniqlo.jpeg` |

### Avatar Images (`public/images/avatars/`)

| Person Name | Required Filename |
|-------------|-------------------|
| Sumit Jangid | `sumit-jangid.jpeg` |

### Badge Images (`public/images/badges/`)

| Badge Name | Required Filename |
|------------|-------------------|
| B2C Developer | `B2CDeveloperBadge.png` |
| B2C Architect | `B2CArchitectBadge.png` |
| Salesforce AgentForce | `SalesforceAgentForce.png` |

### Logo Images (`public/images/logo/`)

| Logo Name | Required Filename |
|-----------|-------------------|
| Sumit Jangir | `SumitJangir.png` |

## Image Specifications

### Project Images
- **Size**: 800x600 pixels
- **Format**: JPG (optimized for web)
- **Aspect Ratio**: 4:3
- **Quality**: 85% compression

### Avatar Images
- **Size**: 400x400 pixels
- **Format**: JPG (optimized for web)
- **Aspect Ratio**: 1:1 (square)
- **Quality**: 85% compression

## How It Works

The system uses highly optimized functions from `lib/images.ts`:

- **Pre-built paths** for maximum performance
- **Direct serving** from public folder
- **Automatic filename sanitization**
- **Next.js Image optimization** with quality and sizing
- **Zero external dependencies**

## Adding New Images

1. **Save image** in the appropriate folder with correct filename
2. **Optimize for web** (compress to ~85% quality)
3. **Update `lib/images.ts`** if adding new pre-built paths
4. **Test locally** to ensure proper loading

## Performance Benefits

✅ **Direct serving** - No placeholder service calls
✅ **Pre-built paths** - Eliminates runtime path generation
✅ **Optimized compression** - 85% quality for best size/quality ratio
✅ **Next.js integration** - Automatic lazy loading and optimization
✅ **Zero external dependencies** - No network calls for placeholders

The system is built for maximum performance with minimal complexity. 