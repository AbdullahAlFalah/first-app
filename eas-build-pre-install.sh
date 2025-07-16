#!/bin/bash

echo "🔧 Running prebuild hook..."

if [ -z "$GOOGLE_SERVICES_JSON" ]; then
  echo "❌ Error: GOOGLE_SERVICES_JSON environment variable is not set."
  exit 1
fi

echo "✅ GOOGLE_SERVICES_JSON is set. Length: ${#GOOGLE_SERVICES_JSON}"
echo "${GOOGLE_SERVICES_JSON:0:50}..."  # Print the first 50 characters for sanity check

echo "$GOOGLE_SERVICES_JSON" | base64 -d > android/app/google-services.json 2> error.log
if [ $? -ne 0 ]; then
  echo "❌ Error: Failed to decode GOOGLE_SERVICES_JSON. Check error.log for details."
  cat error.log
  exit 1
fi

if [ ! -s android/app/google-services.json ]; then
  echo "❌ Error: Failed to create google-services.json from GOOGLE_SERVICES_JSON."
  exit 1
fi

echo "google-services.json created successfully."

