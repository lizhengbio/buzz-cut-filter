#!/bin/bash
# 启动脚本：自动加载环境变量并启动 Supabase

# 加载环境变量
if [ -f .env ]; then
    echo "🔧 Loading environment variables..."
    source .env
    echo "✅ Environment variables loaded"
else
    echo "⚠️  .env file not found"
fi

# 启动 Supabase
echo "🚀 Starting Supabase..."
supabase start

echo "✅ Setup complete!"
echo "📝 You can now run: npm run dev"