const path = require('path');

function resolvePath(relativePath) {
    console.log(path.resolve(relativePath));
}

// Test cases:

resolvePath('./test-files/file.txt');

resolvePath('./non-existent-files/output.txt');