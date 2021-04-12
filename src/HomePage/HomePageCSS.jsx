import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  toolbarIcon: {
    position: 'relative',
    width: '200px',
    alignItems: 'center',
    ...theme.mixins.toolbar,
  },
  toolbar: {
    height: '10%',
    marginLeft: '30px',
  },
  appBar: {
    width: '100%',
    zIndex: theme.zIndex.drawer + 1,
  },
  drawerPaper: {
    width: '200px',
    position: 'relative',
    whiteSpace: 'nowrap',
  },
  content: {
    display: 'flex',
    flexDirection: 'col',
    width: '100%',
  },
  body: {
    position: 'relative',
    height: '85%',
    marginTop: '70px',
  },
  container: {
    minWidth: 'calc(100% - 200px)',
    marginLeft: '200px',
  },
  paper: {
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  contactsIcon: {
    marginRight: '15px',
  },
  loggedUser: {
    marginRight: '0px',
  },
  logo: {
    height: '50px',
  },
  title: {
    flexGrow: 1,
  },
}))

export default useStyles
