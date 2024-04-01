import Match from 'preact-router/match'
import withStyles from './jss'
import LogoutButton from './logout-button'
import { useState, useEffect } from 'preact/hooks'
import { privateProfile } from '../api/profile'

function Header({ classes, paths }) {
  const loggedIn = localStorage.getItem('token') !== null
  // TODO taking the quick and dirty solution here :))))))))
  // if this is unacceptable for reasons, we should turn this into a provider
  const [chips, setChips] = useState(null)
  useEffect(() => {
    const action = async () => {
      const { data, error } = await privateProfile()
      if (error) {
        toast({ body: error, type: 'error' })
        return
      }

      setChips(data.chips)
    }
    // BUGFIX: this fixes getting redirected before verify can finish?
    if(localStorage.getItem('token') !== null) action() // this did not cause a several hour headache
  }, [])

  return (
    <div class={`tab-container tabs-center ${classes.root}`}>
      <ul class={classes.list}>
        {paths.map(({ props: { path, name } }) => (
          <Match key={name} path={path}>
            {({ matches }) => (
              <li class={matches ? 'selected' : ''}>
                <a href={path} class={classes.link}>
                  {name}
                </a>
              </li>
            )}
          </Match>
        ))}
        {loggedIn && (
          <li>
            <LogoutButton class={classes.link} />
          </li>
        )}
      </ul>
      {chips !== null && <div class={classes.chips}>{chips} chips</div>}
    </div>
  )
}

export default withStyles(
  {
    root: {
      background: '#111 !important',
      zIndex: 30
    },
    link: {
      '&:focus': {
        boxShadow: 'none',
        // color copied from Cirrus styles - there is no variable for it
        borderBottomColor: 'rgba(240,61,77,.6)'
      },
      background: '#0000 !important',
      color: '#fff !important',
      padding: '.5rem .7rem !important'
    },
    list: {
      borderBottomColor: '#333 !important',
      '& li.selected a': {
        color: 'rgb(240,61,77) !important'
      }
    },
    chips: {
      position: 'absolute',
      right: '1rem',
      top: '1rem'
    }
  },
  Header
)
