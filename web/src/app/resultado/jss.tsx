import styled from "@emotion/styled";

const corLugar1 = '#FFFF00';
const corLugar2 = '#8F9591';
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
    padding: '2px 8px',

    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',

    '&.pos-0': { backgroundColor: corLugar1, fontWeight: 700 },
    '&.pos-1': { backgroundColor: corLugar2, fontWeight: 700 },
    '&.pos-2': { backgroundColor: corLugar3, fontWeight: 700 },
})