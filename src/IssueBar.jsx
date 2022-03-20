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
                   <span>Total: {totalCount}</span>
                </Col>
                <Col>
                  {' '}
                   <span className="text-primary">New: {newCount}</span>
                </Col>
                <Col>
                  {' '}
                   <span className="text-info">In Progress: {progressCount}</span>
                </Col>
                <Col>
                  {' '}
                   <span className="text-success">Completed: {completedCount}</span>
                </Col>

            </Row>
        </div>
    )
}

export default IssueBar