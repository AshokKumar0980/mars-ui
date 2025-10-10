#!/bin/bash
echo "Building Data Pipeline Application..."
cd "$(dirname "$0")"
mvn clean package
echo "WAR file created at: target/data-pipeline.war"