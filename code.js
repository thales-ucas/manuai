console.log(utf8('\uFFFD\uFFFD\uFFFD\uFFFD\uFFFD'));

function utf8(bytes) {
  let encoded = '';
  for (let i = 0; i < bytes.length; i++) {
    encoded += '%25' + bytes[i].toString(16);
  }
  return decodeURIComponent(encoded);
}

