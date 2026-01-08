import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'
import { createTicket, reset } from '../features/ticket/ticketSlice'
import { BackButton } from '../components/BackButton'

function NewTicket() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { user } = useSelector((state) => state.auth)
  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.tickets
  )

  const [product, setProduct] = useState('iPhone')
  const [description, setDescription] = useState('')

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess) {
      dispatch(reset())
      navigate('/tickets')
    }

    dispatch(reset())
  }, [dispatch, isError, isSuccess, navigate, message])

  const onSubmit = (e) => {
    e.preventDefault()

    dispatch(
      createTicket({
        product,
        description,
      })
    )
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
            <BackButton url='/' />
      <section className="heading">
        <h1>Create New Ticket</h1>
        <p>Please fill the form below</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input type="text" value={user?.name} disabled />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input type="email" value={user?.email} disabled />
          </div>

          <div className="form-group">
            <label>Product</label>
            <select
              value={product}
              onChange={(e) => setProduct(e.target.value)}
            >
              <option value="iPhone">iPhone</option>
              <option value="Macbook Pro">Macbook Pro</option>
              <option value="iMac">iMac</option>
              <option value="iPad">iPad</option>
            </select>
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="form-group">
            <button className="btn btn-block">Submit</button>
          </div>
        </form>
      </section>
    </>
  )
}

export default NewTicket

 