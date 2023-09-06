import styled from "@emotion/styled";

const corLugar1 = '#93930f';
const corLugar2 = '#606263';
const corLugar3 = '#B7701E';

export const ContentJss = styled('div')({
    display: 'grid',
    gridTemplateColumns: 'repeat(3, minmax(100px, 250px))',
    alignItems: 'end',
    justifyContent: 'center',
    rowGap: 16
})

export const Lugar1Jss = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
    backgroundColor: corLugar1
})

export const Lugar2Jss = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: 150,
    backgroundColor: corLugar2
})

export const Lugar3Jss = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    backgroundColor: corLugar3
})

export const RankingContainerJss = styled('ul')({
    gridColumn: '1/-1',
    display: 'flex',
    flexDirection: 'column',
    listStyle: 'none',
    rowGap: 16
})

export const EquipeJss = styled('li')({
    cursor: 'pointer',
    padding: '2px 8px',

    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    fontSize: '1.2rem',

    '&.pos-1': { color: corLugar1, fontWeight: 800, fontSize: '1.8rem' },
    '&.pos-2': { color: corLugar2, fontWeight: 600, fontSize: '1.6rem' },
    '&.pos-3': { color: corLugar3, fontWeight: 600, fontSize: '1.4rem' },
})