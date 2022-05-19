import styled from '@emotion/styled';

const Container = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '#eee',
  height: '100%',
  alignItems: "center",
  justifyContent: "center",
  ' .topbar, .footer': {
    height: '56px',
    display: 'flex',
    flexDirection: 'row'
  },
  ' .topbar': {
  },
  ' .content': {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    padding: '16px 16px 24px 16px'
  },
  ' .footer': {

  },
});

export default Container;