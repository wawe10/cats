import React from "react";
import {useNavigation} from "../routes/useNavigation";
import {
    makeStyles,
    Card,
    CardMedia,
    createStyles,
    CardHeader,
    Avatar,
    CardContent,
    Typography,
    Button,
} from "@material-ui/core/";
import useRouter from "../routes/useRouter";

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            maxWidth: 345,
        },
        media: {
            height: 0,
            paddingTop: "56.25%",
        },
        expand: {
            transform: "rotate(0deg)",
            marginLeft: "auto",
            transition: theme.transitions.create("transform", {
                duration: theme.transitions.duration.shortest,
            }),
        },
        expandOpen: {
            transform: "rotate(180deg)",
        },
        avatar: {
            backgroundColor: "red",
        },
    }),
);

export default function CatDetails(): JSX.Element {
    const {privateStateParams} = useNavigation();
    const {history} = useRouter();
    const classes = useStyles();

    const {origin, life_span, name, description, alt_names, imgUrl} =
        privateStateParams;

    console.log({privateStateParams});

    return (
        <Card className={classes.root}>
            <Button
                // @ts-ignore
                onClick={() => history.goBack()}
                variant="contained"
                color="secondary"
            >
                Back
            </Button>
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                        C
                    </Avatar>
                }
                title={alt_names}
                subheader={life_span}
            />
            <CardMedia
                className={classes.media}
                image={imgUrl}
                title={alt_names}
            />
            <CardContent>
                <Typography variant="subtitle1" color="primary" component="p">
                    {`${origin}-${name}`}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    {description}
                </Typography>
            </CardContent>
        </Card>
    );
}
