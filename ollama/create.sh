#!/bin/bash

set -e

# Paths to modelfiles
MISTRAL_MODELFILE="modelfiles/Modelfile.mistral"
EMBED_MODELFILE="modelfiles/Modelfile.embedding"

# Function to check if a model already exists
function model_exists() {
  ollama list | grep -q "$1"
}

# Create mistral-custom model if it doesn't exist
if model_exists "mistral-custom"; then
  echo "ℹ️  Model 'mistral-custom' already exists."
else
  echo "🚧 Creating model 'mistral-custom' from $MISTRAL_MODELFILE..."
  ollama create mistral-custom --modelfile "$MISTRAL_MODELFILE"
  echo "✅ Model 'mistral-custom' created."
fi

# Create nomic-embed model if it doesn't exist
if model_exists "nomic-embed"; then
  echo "ℹ️  Model 'nomic-embed' already exists."
else
  echo "🚧 Creating model 'nomic-embed' from $EMBED_MODELFILE..."
  ollama create nomic-embed --modelfile "$EMBED_MODELFILE"
  echo "✅ Model 'nomic-embed' created."
fi