import styled from "@emotion/styled";

export const ProvaJss = styled('div')({
    margin: 20,
    display: 'grid',
    gap: 20,
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, auto))',

    'button': {
        width: '100%'
    }
});

export const EquipeGroupJss = styled('div')({
    display: 'flex',
    gap: 20,
    margin: 10
});

export const EquipeContainerJss = styled('div')({
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: 20
});

export const StartContainerJss = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    margin: 20,
    padding: 8,
    borderTop: '1px solid #000',
    borderBottom: '1px solid #000'
});

export const TransmitirContainerJss = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 50,
    gap: 500
});