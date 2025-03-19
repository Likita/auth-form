Object.defineProperty(globalThis, 'TextEncoder', {
  value: class TextEncoder {
    encode(text: string): Uint8Array {
      const arr = new Uint8Array(text.length);
      for (let i = 0; i < text.length; i++) {
        arr[i] = text.charCodeAt(i);
      }
      return arr;
    }
  }
});

Object.defineProperty(globalThis, 'TextDecoder', {
  value: class TextDecoder {
    decode(arr: Uint8Array): string {
      return String.fromCharCode.apply(null, Array.from(arr));
    }
  }
});
