import withStyles from '../components/jss'
import { useState, useCallback, useRef, useMemo } from 'preact/hooks'

import { submitFlag, getSolves } from '../api/challenges'
import { useToast } from './toast'
import SolvesDialog from './solves-dialog'
import Markdown from './markdown'
import { buyItem, equipItem } from '../api/items'
import { addFont } from '../util/items'

const ExternalLink = (props) => <a {...props} target="_blank" />

const markdownComponents = {
  A: ExternalLink
}

const solvesPageSize = 10

const Problem = ({ classes, item, owned, equipped, setItemStatus }) => {
  const { toast } = useToast()

  const [error, setError] = useState(undefined)
  const hasError = error !== undefined
  const Preview = useMemo(() => {
    const init = async () => {
      switch (item.type) {
        case 'font':
            addFont(item.id, item.resourceUrl);
          break
      }
    }
    init()

    switch (item.type) {
      case 'font':
        return () => (
          <p style={{ fontFamily: `font-${item.id}` }} class={`${classes.preview}`}>
            This is how text will look on your profile
          </p>
        )
      case 'background':
        return () => (
          <img src={item.resourceUrl} class={`${classes.preview} ${classes.previewImage}`}/>
        )
    }
  }, [item])

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault()
      if (!owned) {
        buyItem(item.id).then(({ error }) => {
          if (error === undefined) {
            toast({ body: 'Item successfuly bought!' })

            setItemStatus(item.id, 'BUY')
          } else {
            toast({ body: error, type: 'error' })
          }
        })
      } else if (owned && equipped) {
        equipItem(item.id).then(({ error }) => {
          if (error === undefined) {
            toast({ body: 'Item Successfully unequipped!' })

            setItemStatus(item.id, 'UNEQUIP')
          } else {
            toast({ body: error, type: 'error' })
          }
        })
      } else {
        equipItem(item.id).then(({ error }) => {
          if (error === undefined) {
            toast({ body: 'Item Successfully equipped!' })

            setItemStatus(item.id, 'EQUIP')
          } else {
            toast({ body: error, type: 'error' })
          }
        })
      }
    },
    [toast, setItemStatus, owned, equipped]
  )
  return (
    <div class={`frame ${classes.frame}`}>
      <div class="frame__body">
        <div class="row u-no-padding">
          <div class="col-6 u-no-padding">
            <div class="frame__title title">{item.name}</div>
            <div class="frame__subtitle u-no-margin">{item.type}</div>
          </div>
          <div class="col-6 u-no-padding u-text-right">
            <div class={`${classes.points}`}>{item.price} chips</div>
          </div>
        </div>

        <div class="content-no-padding u-center">
          <div class={`divider ${classes.divider}`} />
        </div>

        <div class={`${classes.description} frame__subtitle`}>
          <Markdown
            content={item.description}
            components={markdownComponents}
          />
          <h6>Preview</h6>
          {Preview && <Preview />}
        </div>

        <button
          class={`form-group-btn btn-small ${classes.submit}`}
          onClick={handleSubmit}
        >
          {owned ? (equipped ? 'UNEQUIP' : 'EQUIP') : 'BUY'}
        </button>
      </div>
      {/* <SolvesDialog
        solves={solves}
        challName={problem.name}
        solveCount={problem.solves}
        pageSize={solvesPageSize}
        page={solvesPage}
        setPage={handleSetSolvesPage}
        onClose={onSolvesClose}
        modalBodyRef={modalBodyRef}
      /> */}
    </div>
  )
}

export default withStyles(
  {
    frame: {
      marginBottom: '1em',
      paddingBottom: '0.625em',
      background: '#222'
    },
    description: {
      '& a': {
        display: 'inline',
        padding: 0
      },
      '& p': {
        lineHeight: '1.4em',
        fontSize: '1em',
        marginTop: 0
      },
      '& pre': {
        whiteSpace: 'pre-wrap'
      }
    },
    divider: {
      margin: '0.625em',
      width: '80%'
    },
    points: {
      marginTop: '0.75rem !important',
      marginBottom: '0 !important',
      display: 'inline-block',
      transition: 'opacity ease-in-out 0.2s',
      fontWeight: 700,
      color: 'rgb(240,61,77)'
    },
    solvesPending: {
      opacity: '0.6',
      pointerEvents: 'none',
      cursor: 'default'
    },
    tag: {
      background: '#111'
    },
    input: {
      background: '#111',
      color: '#fff !important'
    },
    submit: {
      background: '#111',
      color: '#fff',
      '&:hover': {
        background: '#222'
      }
    },
    preview: {
      fontSize: '1.5rem !important',
      marginTop: '0.5rem'
    },
    previewImage: {
      aspectRatio: '16 / 9'
    }
  },
  Problem
)
