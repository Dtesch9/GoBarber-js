import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import { pt } from 'date-fns/locale';

import Icon from 'react-native-vector-icons/MaterialIcons';

import { Container, DateButton, DateText } from './styles';

export default function DateInput({ date, onChange }) {
  const [opened, setOpened] = useState(false);

  const dateFormatted = useMemo(
    () => format(date, "dd 'de' MMMM 'de' yyyy", { locale: pt }),
    [date]
  );

  function setDate(_, newDate) {
    if (newDate !== undefined) {
      setOpened(!opened);
      onChange(newDate);
    }
  }

  return (
    <Container>
      <DateButton onPress={() => setOpened(!opened)}>
        <Icon name="event" color="#fff" size={20} />
        <DateText>{dateFormatted}</DateText>
      </DateButton>

      {opened && (
        <DateTimePicker
          value={date}
          mode="date"
          display="spinner"
          minimumDate={new Date()}
          onChange={setDate}
        />
      )}
    </Container>
  );
}

DateInput.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  onChange: PropTypes.func.isRequired,
};
