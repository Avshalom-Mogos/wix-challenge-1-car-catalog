import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 300,
    },
    media: {
      height: 170,
    },
    price: {
      fontSize: 18,
      padding: theme.spacing(1),
    },
  })
);
