#!/bin/bash

set -e

# Start the mistral-custom model in the background
echo "🚀 Starting 'mistral-custom' model..."
OLLAMA_ORIGINS=localhost nohup ollama run mistral-custom > mistral.log 2>&1 &
echo "📄 Log output: mistral.log"

# Start the nomic-embed model in the background
echo "🚀 Starting 'nomic-embed' model..."
OLLAMA_ORIGINS=localhost nohup ollama run nomic-embed > nomic-embed.log 2>&1 &
echo "📄 Log output: nomic-embed.log"

echo "✅ Both models are now running in the background."
echo "👉 Use 'tail -f mistral.log' or 'tail -f nomic-embed.log' to monitor logs."