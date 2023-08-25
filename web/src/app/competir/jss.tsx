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

export const EquipeContainerJss = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
    margin: 10
});

export const EquipeStageJss = styled('div')({
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20
});

export const EquipeJss = styled('div')({
    minWidth: 100,
    display: 'flex',
    gap: 16,
});

export const EquipeHeaderJss = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
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

export const CronometroHeader = styled('h1')({

});

export const CronometroTimerJss = styled('h2')({
    marginTop: 20,
    textAlign: 'center'
});

export const CronometroEquipeJss = styled('div')({
    display: 'flex',
    flexDirection: 'row',
    gap: 30,
    margin: 20
})

export const HubEquipeJss = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 20,
    flex: 1,

    'button.concluir': {
        margin: '40px 0px'
    }
})

export const PunicaoJss = styled('div')({
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    borderColor: '#546E7A',
    borderWidth: '1px',
    borderStyle: 'solid',
    textAlign: 'center',

    'span.title': {
        width: '100%',
        backgroundColor: '#546E7A',
        color: '#FFFFFF',
        padding: 8
    },

    'button': {
        width: 50,
        height: 50,
        borderRadius: 0
    },

    'span.display': {
        flex: 1
    }
})

export const ConcluirContainerJss = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 40,
    marginTop: 40
})