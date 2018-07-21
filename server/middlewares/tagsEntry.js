export default (req,res,next) => {
  const { content } = req.body;

  let tags = content.match(/#\w+/g);

  req.tags = tags;
}