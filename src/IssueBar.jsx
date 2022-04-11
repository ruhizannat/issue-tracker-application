import { useContext } from "react"
import { Row, Col } from "react-bootstrap"
import { BarCounterContext } from './context/BarCounterContext'
const IssueBar = () =>{

  const { newCount, totalCount, progressCount, completedCount } =
  useContext(BarCounterContext)
    return(
        <div>
            <Row>
                <Col>
                  {' '}
                   <span>Total: </span>{totalCount}
                </Col>
                <Col>
                  {' '}
                   <span className="text-primary">New: </span>{newCount}
                </Col>
                <Col>
                  {' '}
                   <span className="text-info">In Progress: </span>{progressCount}
                </Col>
                <Col>
                  {' '}
                   <span className="text-success">Completed: </span>{completedCount}
                </Col>

            </Row>
        </div>
    )
}

export default IssueBar