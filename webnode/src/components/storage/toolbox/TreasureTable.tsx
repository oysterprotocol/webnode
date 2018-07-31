import React from "react";
import { Table, Header } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

const TreasureTable = ({ treasures }: any) => (
  <Table celled padded>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Chunk Index</Table.HeaderCell>
        <Table.HeaderCell>Treasure Content</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {treasures.map((s: any) => (
        <Table.Row key={s.nextChunkIdx - 1}>
          <Table.Cell>
            {" "}
            <Header as="h2" textAlign="center">
              {s.nextChunkIdx - 1}
            </Header>
          </Table.Cell>
          <Table.Cell>{s.treasure}</Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>
  </Table>
);

export default TreasureTable;
