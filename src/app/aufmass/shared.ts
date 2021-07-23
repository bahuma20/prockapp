export function formatDimensions(dimensions: string): string {
  if (!dimensions) {
    return '';
  }

  dimensions = dimensions.replace(/\./g, ',')


  const allowedPunctuation = '+-*/()';

  allowedPunctuation.split('').forEach(item => {
    // @ts-ignore
    dimensions = dimensions.replaceAll(item, ' '+item+' ');
  })

  // @ts-ignore
  dimensions = dimensions.replaceAll('  ', ' ');

  return dimensions;
}
