import {Card, CardContent, CardMedia, Grid, Typography, Container} from "@mui/material";
import {makeStyles} from "@mui/material";

const useStyles = makeStyles((theme) => ({
	cardMedia: {
		paddingTop: '56.25%', // 16:9
	},
	link: {
		margin: theme.spacing(1, 1.5),
	},
	cardHeader: {
		backgroundColor:
			theme.palette.type === 'light'
				? theme.palette.grey[200]
				: theme.palette.grey[700],
	},
	postTitle: {
		fontSize: '16px',
		textAlign: 'left',
	},
	postText: {
		display: 'flex',
		justifyContent: 'left',
		alignItems: 'baseline',
		fontSize: '12px',
		textAlign: 'left',
		marginBottom: theme.spacing(2),
	},
}));

const Posts = (props) => {
	const { posts } = props;
	const classes = useStyles();
	if (!posts || posts.length === 0) return <p>Can not find any posts, sorry</p>;
	return (
		<>
			<Container maxWidth="md" component="main">
				<Grid container spacing={5} alignItems="flex-end">
					{posts.map((post) => {
						return (
							// Enterprise card is full width at sm breakpoint
							<Grid item key={post.id} xs={12} md={4}>
								<Card className={classes.card}>
									<CardMedia
										className={classes.cardMedia}
										image="https://source.unsplash.com/random"
										title="Image title"
									/>
									<CardContent className={classes.cardContent}>
										<Typography
											gutterBottom
											variant="h6"
											component="h2"
											className={classes.postTitle}
										>
											{post.title.substr(0, 50)}...
										</Typography>
										<div className={classes.postText}>
											<Typography
												component="p"
												color="textPrimary"
											></Typography>
											<Typography variant="p" color="textSecondary">
												{post.excerpt.substr(0, 60)}...
											</Typography>
										</div>
									</CardContent>
								</Card>
							</Grid>
						);
					})}
				</Grid>
			</Container>
		</>
	);
};
export default Posts;