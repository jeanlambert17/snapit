export default (fields) => {
  const keys = Object.keys(fields) ;
  return keys.some(key => fields[key] === '');
}