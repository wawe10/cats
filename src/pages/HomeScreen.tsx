import React, {useEffect, useState} from "react";
import {DETAILS} from "../routes/paths";
import useRouter from "../routes/useRouter";
import {useRequestApi} from "../api/useAPI";
import {
    FormControl,
    InputLabel,
    NativeSelect,
    FormHelperText,
    makeStyles,
    Box,
    Card,
    CardMedia,
    Grid,
    Button,
} from "@material-ui/core/";

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    viewDetail: {
        margin: theme.spacing(2),
        padding: theme.spacing(1),
    },
    loadMore: {
        margin: "auto",
        left: 0,
        right: 0,
        width: 200,
    },
    loadMoreContainer: {
        width: "100%",
        display: "flex",
    },
}));

interface Cat {
    name: string;
    id: string;
    description: string;
}

interface SelectCatListProps {
    onChange: (value: string) => void;
    catList?: Array<Cat>;
}

interface Event {
    target: {value: string};
}

interface CatBreedsData {
    breeds: Array<Cat>;
    id: string;
    url: string;
}

interface ApiResponse {
    data: Array<CatBreedsData>;
    count: number;
}

function SelectCatList({
    catList,
    onChange,
}: SelectCatListProps): JSX.Element | null {
    const [selectedCat, setSelectedCat] = useState("");
    const classes = useStyles();

    function onSelect(event: Event) {
        const value = event?.target.value;

        setSelectedCat(value);

        onChange(value);
    }

    if (!catList) {
        return null;
    }

    return (
        <FormControl className={classes.formControl}>
            <InputLabel htmlFor="myCat-native-helper">My Cat</InputLabel>
            <NativeSelect
                value={selectedCat}
                onChange={onSelect}
                inputProps={{
                    name: "cats",
                    id: "myCat-native-helper",
                }}
            >
                {catList.map(({name, id}) => (
                    <option key={`${name}-${id}`} value={id}>
                        {name}
                    </option>
                ))}
            </NativeSelect>
            <FormHelperText>Please select your cat</FormHelperText>
        </FormControl>
    );
}

const PAGE_LIMIT = 10;

export default function CatDetails(): JSX.Element {
    const classes = useStyles();
    const {navigate} = useRouter();
    const {get} = useRequestApi();
    const [catList, setCatList] = useState();
    const [catsParams, setCatsParams] = useState({
        limit: PAGE_LIMIT,
        catId: "",
    });
    const [canLoadMore, setCanLoadMore] = useState(false);
    const [catsByBreed, setCatByBreed] = useState<Array<CatBreedsData>>([]);

    const getCatBreeds = async () => {
        const {data: catBreeds} = await get("/breeds");

        setCatList(catBreeds);
    };

    async function onChange(catId: string) {
        const {data, count}: ApiResponse = await get(
            `/images/search?page=1&limit=10&breed_id=${catId}`,
        );

        setCatsParams({
            limit: count + PAGE_LIMIT,
            catId,
        });
        setCanLoadMore(Boolean(count >= 10));
        setCatByBreed(data || []);
    }

    async function loadMore() {
        const upLimit = catsParams.limit + PAGE_LIMIT;
        const currentId = catsParams.catId;

        const {data: catBreeds, count}: ApiResponse = await get(
            `/images/search?page=1&limit=${upLimit}&breed_id=${currentId}`,
        );

        setCatsParams({
            limit: upLimit,
            catId: currentId,
        });
        setCanLoadMore(Boolean(count >= upLimit));
        setCatByBreed(catBreeds);
    }

    function onViewDetail(cat: Array<Cat>, imgUrl: string) {
        navigate({
            pathname: DETAILS,
            stateParams: {...cat[0], ...{imgUrl}},
        });
    }

    useEffect(() => {
        getCatBreeds();
    }, []);

    return (
        <Box p={1}>
            <SelectCatList catList={catList} onChange={onChange} />
            <Grid spacing={1} container>
                {catsByBreed.map(({url, id, breeds}, index) => (
                    <Grid key={`${id}-${index}`} xs={4} item>
                        <Card>
                            <CardMedia component="img" image={url} />
                            <Button
                                onClick={() => onViewDetail(breeds, url)}
                                className={classes.viewDetail}
                                variant="contained"
                                color="primary"
                            >
                                View Details
                            </Button>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Box className={classes.loadMoreContainer} p={1}>
                {canLoadMore && (
                    <Button
                        onClick={loadMore}
                        className={classes.loadMore}
                        variant="contained"
                        color="secondary"
                    >
                        Load More...
                    </Button>
                )}
            </Box>
        </Box>
    );
}
