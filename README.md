# Astro SSR

Template for server-side rendered Astro application.

## Stack

- **Frontend**: Astro with SSR, React components, SCSS, Pico CSS
- **Infrastructure**: AWS CDK (TypeScript)
  - Lambda with Function URLs (IAM auth)
  - CloudFront with Origin Access Control
  - S3 for static assets
- **Custom Adapter**: Custom Lambda adapter for Astro SSR

## Project Structure

```
├── adapter/         # Custom Astro adapter for Lambda
├── cdk/             # AWS CDK infrastructure code
├── src/             # Astro application source
│   ├── components/  # React components
│   ├── layout/      # Astro layouts
│   ├── pages/       # Astro pages
│   └── style/       # SCSS styles
├── public/          # Static assets
└── preview.mjs      # Local preview server
```

## Getting Started

### Prerequisites

- Node.js
- AWS CLI and CDK CLI


## Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

### Deploy

```bash
# Build the Astro app
npm run build

# Deploy infrastructure
cd cdk
npm install
npm run build
cdk deploy --profile your-aws-profile

# Sync static assets to S3
aws s3 sync ../dist/client/ s3://YOUR-ACCOUNT-BUCKET/ --profile your-aws-profile
```

## TODO
CI/CD with GHA
