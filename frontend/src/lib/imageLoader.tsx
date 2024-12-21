const imageLoader = ({ src, width }: { src: string; width: number }) => {
  return `${src}-${width}`;
};

export default imageLoader;
