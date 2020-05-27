<CardContent>
<Typography
  variant="body2"
  color="textSecondary"
  component="p"
  style={{
    fontSize: ".7rem",
    display: "flex",
    justifyContent: "center",
  }}
>
  Trending in Topic:
</Typography>
<div style={{ display: "flex", justifyContent: "space-around" }}>
  <Typography className={classes.trendingTopics}>#hashtag</Typography>
  <Typography className={classes.trendingTopics}>@handle</Typography>
  <Typography className={classes.trendingTopics}>keyword</Typography>
</div>
</CardContent>