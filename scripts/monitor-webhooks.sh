#!/bin/bash

echo "🔍 监控Webhook事件 (按Ctrl+C停止)"
echo "Ngrok URL: https://0b09228a9206.ngrok-free.app"
echo "Webhook端点: https://0b09228a9206.ngrok-free.app/api/webhooks/creem"
echo "============================================"

while true; do
    echo "$(date): 检查webhook日志..."
    curl -s "http://localhost:3000/api/webhook-logs" | jq -r '.logs[] | "\(.timestamp): \(.type) - \(.data)"' 2>/dev/null || echo "无新日志"
    echo "---"
    sleep 5
done