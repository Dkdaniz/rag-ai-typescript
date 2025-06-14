#!/bin/bash

set -e

# Stop mistral-custom
echo "🛑 Stopping 'mistral-custom'..."
pkill -f "ollama run mistral-custom" && echo "✔️ 'mistral-custom' stopped." || echo "⚠️ 'mistral-custom' not running."

# Stop nomic-embed
echo "🛑 Stopping 'nomic-embed'..."
pkill -f "ollama run nomic-embed" && echo "✔️ 'nomic-embed' stopped." || echo "⚠️ 'nomic-embed' not running."

echo "✅ All requested models have been stopped (if running)."