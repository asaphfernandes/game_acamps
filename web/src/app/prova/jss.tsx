import styled from "@emotion/styled";

export const ContainerJss = styled('ul')({
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto 20px',
    gap: 16

});

export const ProvaJss = styled('li')({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 500,


    'button': {
        width: 150,
    }
});