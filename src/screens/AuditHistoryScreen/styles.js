const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Theme.WHITE,
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    lineHeight: 42,
    fontWeight: '600',
    color: Theme.SECONDARY_BLUE,
    textAlign: 'center',
  },
  noData: {
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '300',
    color: Theme.GREY,
  },
  container: {
    backgroundColor: Theme.WHITE,
    borderColor: Theme.GREY,
    borderWidth: 1,
    elevation: 2,
    borderRadius: 4,
    margin: 14,
    // padding: 10,
    shadowColor: Theme.BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  title: {
    fontSize: 14,
    lineHeight: 18,
    marginTop: 10,
    fontWeight: '600',
    color: Theme.SECONDARY_BLUE,
  },
  divider: {
    borderBottomWidth: 1,
    borderColor: Theme.GREY,
    // marginVertical: 8,
  },
  comment: {
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '350',
    color: Theme.BLACK,
    // marginTop: 8,
    // marginHorizontal: 5,
  },
  block: {
    marginVertical: 8,
  },
  innerView: { padding: 8 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 8,
  },
  deleteButton: {
    backgroundColor: Theme.LIGHT_GREY,
    padding: 7,
    borderRadius: 40,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginLeft: 20,
  },
  FlatListContainer: { width: '100%' },
  noDataContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});

export default styles;
