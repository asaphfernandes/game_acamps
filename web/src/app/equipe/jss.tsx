import styled from "@emotion/styled";

export const ContainerJss = styled('ul')({
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
    width: 500,
    gap: 16,

    'input': {
        flex: 1
    },

    'button': {
        width: 150,
    }
});