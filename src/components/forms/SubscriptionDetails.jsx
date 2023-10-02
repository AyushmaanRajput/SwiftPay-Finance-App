import styled from "styled-components";
import { ButtonSmall } from "../Buttons";

export const SubscriptionDetails = ({closeModal, viewSubscriptionData}) => {
    
    const {logo, name, type, description, amount, billing_cycle} = viewSubscriptionData;
    return <DIV>
        <img src={logo} />
        <div className="view-subscription-details-div">
            <h5>{name}</h5>
            <h5>{type}</h5>
            <p>{description}</p>
            <p>$ {amount}</p>
            <div>
                <p>Features: </p>
                {  viewSubscriptionData?.features?.map((ele) => {
                    return <ul>
                        <li>{ele}</li>
                    </ul>
                })}
            </div>
            {/* <p>Billed: {billing_cycle}</p> */}
        </div>
        <ButtonSmall children={"Close"} onClick={closeModal} />
    </DIV>
}

const DIV = styled.div`

    width: 300px;
    /* padding: 10px; */
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: left;
    color: var(--primary-grey);
    gap: 20px;
    /* text-align: center; */

    img {

        width: 200px;
        height: 200px;
        object-fit: cover;
    }

    ul {
        list-style-type: none ;
        padding: 0;
        margin: 0;
    }
    li {
        font-size: 14px;
        margin: 5px 0 0 5px;
    }
`