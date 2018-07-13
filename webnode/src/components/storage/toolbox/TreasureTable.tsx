import * as React from "react";
import Semantic from "semantic-ui-react";

const TreasureTable = (treasures: any) => (
  <Semantic.Table celled padded>
    <Semantic.Table.Header>
      <Semantic.Table.Row>
        <Semantic.Table.HeaderCell>Chunk Index</Semantic.Table.HeaderCell>
        <Semantic.Table.HeaderCell>Treasure Content</Semantic.Table.HeaderCell>
      </Semantic.Table.Row>
    </Semantic.Table.Header>
    <Semantic.Table.Body>
      {treasures.map((s: any) => (
        <Semantic.Table.Row key={s.nextChunkIdx - 1}>
          <Semantic.Table.Cell>
            {" "}
            <Semantic.Header as="h2" textAlign="center">
              {s.nextChunkIdx - 1}
            </Semantic.Header>
          </Semantic.Table.Cell>
          <Semantic.Table.Cell>{s.treasure}</Semantic.Table.Cell>
        </Semantic.Table.Row>
      ))}
    </Semantic.Table.Body>
  </Semantic.Table>
);

export default TreasureTable;
