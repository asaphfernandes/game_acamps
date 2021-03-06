import styled from "@emotion/styled";

export const ContainerJss = styled('ol')({
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    margin: 20
});

export const EquipeContainerJss = styled('ol')({
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: 'auto 20px',
    gap: 16

});

export const EquipeJss = styled('li')({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 500,
    gap: 16,

    'input': {
        flex: 1
    },

    'button': {
        width: 150,
    }
});