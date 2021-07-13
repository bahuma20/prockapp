export function formatDimensions(dimensions: string): string {
  if (!dimensions) {
    return '';
  }

  const allowedPunctuation = '+-*/()';

  allowedPunctuation.split('').forEach(item => {
    // @ts-ignore
    dimensions = dimensions.replaceAll(item, ' '+item+' ');
  })

  // @ts-ignore
  dimensions = dimensions.replaceAll('  ', ' ');

  return dimensions;
}
