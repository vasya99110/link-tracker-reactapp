import React from 'react'
import UserListAction from './components/UserListAction'
import { useUser } from '../../../context/user-context'
import { getUserList } from '../../../utils/admin-client'

function UserListContainer() {
  const [data, setData] = React.useState([])
  const columns = React.useMemo(() => [
    {
      id :'avatar',
      Header: 'Image',
      Cell: ({ cell: { value } }) => {
        return <img src={value} className='img-responsive' />
      },
      accessor: 'avatar'
    },
    {
      id: 'name',
      Header: 'Name',
      accessor: 'name'
    },
    {
      id: 'email',
      Header: 'Email',
      accessor: 'email'
    },
    {
      id: 'status',
      Header: 'Status',
      accessor: 'status'
    },
    {
      id: 'plan',
      Header: 'Current Plan',
      acccessor: 'plan'
    },
    {
      id: 'testCount',
      Header: 'Test Performed',
      accessor: 'testCount'
    },
    {
      id: 'action',
      Header: 'Action',
      Cell: ({ cell: { value } }) => <UserListAction userId={value}/>,
      accessor: 'id'
    }
  ])

  const fetchIdRef = React.useRef(0)
  const user = useUser()
  const fetchData = React.useCallback(({ pageSize, pageIndex }) => {
    const fetchId = ++fetchIdRef.current
    if (fetchId === fetchIdRef.current) {
      getUserList().then(response => {
        setData(response.data)
      })
    }
  }, [])

  return <>
    Test
  </>
}

export default UserListContainer