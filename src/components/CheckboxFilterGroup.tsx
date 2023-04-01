import { Checkbox, Typography } from "@mui/material";

export default function CheckboxFilterGroup(props: {
  label?: string;
  filters: {
    [label: string]: boolean;
  };
  onOptionClick: (label: string) => void;
}) {
  const { label, filters } = props;
  if (!filters) return null;
  return (
    <div className="mb-2 flex items-center">
      <Typography
        variant="subtitle2"
        className="font-bold text-xs mr-3"
        color="primary"
        fontWeight={900}
        component="span"
      >
        {`${label.toUpperCase()}:  `}
      </Typography>
      <div className="flex gap-3">
        {Object.keys(filters).map((label) => {
          return (
            <div key={label} className="flex items-center">
              <Checkbox
                className="py-0 pl-0 pr-1"
                // @ts-expect-error this is a valid size
                size="x-small"
                checked={filters[label]}
                onClick={() => {
                  props.onOptionClick(label);
                }}
              />
              <span className="text-xs">{label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
