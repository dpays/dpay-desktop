// @flow
import React, { Component } from 'react';

import { Form, Input } from 'formsy-semantic-ui-react'
import { Divider, Grid, Header, Label, Segment, Select } from 'semantic-ui-react';

export default class RPC extends Component {

  onValidSubmit = (
   e: SyntheticEvent
 ) => {
    const { setPreference } = this.props.actions;
    setPreference('dpayd_node', e.dpayd_node);
 }

  render() {
    return (
      <Form onValidSubmit={this.onValidSubmit}>

        <Header>
          Preferred dPay Node
          <Header.Subheader>
            Configure which dPay node your wallet connects to in order to broadcast transactions.
          </Header.Subheader>
        </Header>

        <Segment attached>
          <Grid>
            <Grid.Column width={9}>
              <Form.Input
                label="dPay RPC Node"
                name="dpayd_node"
                instantValidation
                validations="isUrl"
                validationErrors={{
                  isUrl: 'Requires a valid URL starting with http:// or https://'
                }}
                errorLabel={ <Label color="red" pointing /> }
                value={this.props.preferences.dpayd_node}
              />
            </Grid.Column>
            <Grid.Column width={7}>
              <Form.Button color='blue' content='Update' label={`Currently: ${this.props.preferences.dpayd_node}`}/>
            </Grid.Column>
          </Grid>
        </Segment>

      </Form>
    );
  }
}
